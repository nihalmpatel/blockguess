pragma solidity ^0.4.4;

contract GamblingToken {

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    
    function createTokens(address _owner, uint256 _value) public payable returns(uint256) { }
    function totalSupply() view public returns (uint256 supply) { }
    function transfer(address _to, uint256 _value) public returns (bool success) { }
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) { }
    function balanceOf(address _owner) view public returns (uint256 balance) { }
    function approve(address _spender, uint256 _value) public returns (bool success) { }
    function allowance(address _owner, address _spender) view public returns (uint256 remaining) { }
    
}

contract BetGame {
    
    modifier ownerOnly{
        if(owner!=msg.sender) { revert(); }
        _;
    }
    
    struct Room {
        address gambler;
        address[2] bidders;
    }
    
    struct Gambler {
        string gamblerName;
        uint8 guessedNumber;
    }
    
    struct Bidder {
        string bidderName;
        uint[] guesses;
    }
    
    Room[] public rooms;
    uint BID_PRICE = 5;
    uint WINNING_AMT = 15;
    
    mapping(address => Gambler) public gamblers;
    mapping(address => Bidder) public bidders;
    
    event payableInvocation(address indexed caller,uint amount);
    
    address owner;
    uint public bidder_count;
    uint public gambler_count;
    uint public room_number;
    
    GamblingToken gbt;
    
    function BetGame(address gbtAddress) public payable {
        require(gbtAddress != address(0x0));
        owner = msg.sender;
        gbt = GamblingToken(gbtAddress);
    }
    
    function() payable public {
        payableInvocation(msg.sender,msg.value);
    }
    
    function buyTokens() public payable {
        require(msg.value > 0);
        uint256 tokens = gbt.createTokens(this,msg.value) + gbt.allowance(this,msg.sender);
        gbt.approve(msg.sender,tokens);
    }
    
    function getBalance() view public returns(uint256) {
        return gbt.balanceOf(msg.sender)+gbt.allowance(this,msg.sender);
    }
    
    // "b",[0,1,2,3,4,5,6,7,8,9]
    // "c",[10,11,12,13,14,15,16,17,18,19]
    function bid(string name,uint[] guesses) public {
        assert(bytes(name).length > 0 && guesses.length == 10);
        /*string memory nm="b";
        uint8[10] memory guesses=[0,1,2,3,4,5,6,7,8,9];*/
        require(getBalance() >= BID_PRICE);
        // checking if bidder is already a gambler
        if(bytes(gamblers[msg.sender].gamblerName).length > 0) { revert(); }
        // checking if bidder alredy exists
        if(bytes(bidders[msg.sender].bidderName).length == 0) {
            Bidder memory b;
            b.bidderName = name;
            b.guesses = guesses;
            bidders[msg.sender] = b;
            addInRoom(msg.sender, true);
        } else { revert(); }
    }
    
    function gamble(string name) public {
        //string memory name="test";
        assert(bytes(name).length > 0);
        uint8 num = rand();
        require(getBalance() >= BID_PRICE);
        // checking if gambler is already a bidder
        if(bytes(bidders[msg.sender].bidderName).length > 0) { revert(); }
        // checking if gambler alredy exists
        if(bytes(gamblers[msg.sender].gamblerName).length == 0) {
            Gambler memory g;
            g.gamblerName = name;
            g.guessedNumber = num;
            gamblers[msg.sender] = g;
            gambler_count++;
            addInRoom(msg.sender, false);
        } else { revert(); }
    }
    
    function addInRoom(address user, bool isBidder) private {
        
        // collecting participant amount
        gbt.approve(user,gbt.allowance(this,user)-BID_PRICE);
        
        if ( isBidder ) {
            room_number = bidder_count/2;
            
            if(room_number>=gambler_count) {
                if (bidder_count%2==0) {
                    Room memory r;
                    r.bidders[0] = user;
                    rooms.push(r);
                } else {
                   rooms[room_number].bidders[1]=user;  
                }
            } else {
                
                if (rooms[room_number].bidders[0] == address(0x0)) {
                   rooms[room_number].bidders[0]=user; 
                } else {
                   rooms[room_number].bidders[1]=user;  
                }
                  
            } 
            
            bidder_count++;
            
        } else {
            // create new room for gambler
            if(gambler_count>rooms.length) {
                Room memory r1;
                r1.gambler = user;
                rooms.push(r1); 
            } else { // insert into existing room 
                rooms[gambler_count-1].gambler=user;
            }
        }
    }
    
    // withdraw, pay and clean room
    function withdraw(uint room_no) public {
        Room memory current_room = rooms[room_no];
        
        if( current_room.bidders[0]!=address(0) && current_room.bidders[1]!=address(0) && current_room.gambler!=address(0)) {
            
            uint8 guessed_value = gamblers[current_room.gambler].guessedNumber;
            
            // checking if winner is from bidders and pay 
            for(uint8 i=0;i<10;i++) {
                if (bidders[current_room.bidders[0]].guesses[i] == guessed_value) {
                    gbt.transfer(current_room.bidders[0],WINNING_AMT);
                    return;
                }
                if (bidders[current_room.bidders[1]].guesses[i] == guessed_value) {
                    gbt.transfer(current_room.bidders[1],WINNING_AMT);
                    return;
               }
            }
            
            // else 
            gbt.transfer(current_room.gambler,WINNING_AMT);
            return;
       
        } else { revert(); }
    }
    
    function rand() public view returns(uint8 num) {
        uint8 min = 1 ;
        uint8 max = 100;
        bytes32  seed = block.blockhash(block.number - 3);
        num = (uint8(keccak256(seed)) % (min+max)) - min;
    }
    
}
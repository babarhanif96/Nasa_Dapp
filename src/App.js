import React  from "react";
import "./App.css";
import Web3 from "web3";
import contract from "./build/contracts/ABI.json";
//import Image from "./images/back.jpeg";
import ParticleBackground from "./ParticleBackground";
import Mint from "./images/mint.jpeg";
import Both from "./images/bothh.png";
import jQuery from "jquery";
const contractAddress =  "0x3e1B30C9363040DE2fBe06f71f27769e306BB091"

class App extends React.Component {

  async componentWillMount() {
   
    const webeProvider = new Web3(Web3.givenProvider);
    
    
    const ethereum = window.ethereum
    

    
    const accounts = await webeProvider.eth.getAccounts();
   // console.log("enter" , accounts[0])
    if(accounts[0]){

   
  
      console.log("enter" , accounts[0])
     this.loadWeb3();
     this.loadBlockchainData();
  }
    //this.loadWeb3();
    console.log("enter ni")
  
    //let check = setInterval(() => console.log('hi'), 1000);
    

    // function abc(){
        
      setInterval(() =>{
          
       // let a = 1;
      
       if(this.state.balance && this.state.balancee >= 1 ){  this.setState({ balancee: this.state.balancee - 1}) }else if (this.state.balance){ this.setState({ balancee:  "please Refresh Page"})}}  , 1000 )
      // if( this.state.balancee >= 1 ){  this.setState({ balancee:  this.state.balancee - 1}) }else{ this.setState({ balancee:  "Please Refresh Page "})} } , 1000 )
      
      setInterval(() =>{
          
        // let a = 1;
       
        if(this.state.balance){  this.setState({ timestartauction:  this.state.timestartauction - 1}) }}  , 1000 )

     

  

    
   
  }

  componentDidMount() {
    document.body.style.backgroundColor = "#282c34";
  }

  constructor(props) {
    super(props);
    this.tryCon = this.tryCon.bind(this);
    this.loadWeb3 = this.loadWeb3.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.addd = this.addd.bind(this);
    this.min = this.min.bind(this);
    this.sendToken = this.sendToken.bind(this);
    this.loadBlockchainData = this.loadBlockchainData.bind(this);
    this.state = {
      receiver: "",
      TimeUntilAuctionStart: "",
      amount: "",
      account: "",
      totalSupply: "",
      symbol: "",
      balance: "",
      balancee: "",
      totalsupply : "",
      maxsupply :"",
      mintValue : "",
      maxmint : '',
      timestartauction : "",
      color :"black",
      conname: "Connect",

      
    };
  }

   tryCon(){
     this.loadWeb3();
     this.loadBlockchainData();

  }
   async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      this.setState({ conname: "Connected" });   
    this.setState({ color: "green"});
     
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }

  
    
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
 console.log("hi")
    if(event.target.value < 1 || event.target.value > this.state.maxmint ){
      this.setState({ mintValue : 0 });
      
    }
  };

  async sendToken() {
    const web3 = window.web3;
    const webeProvider = new Web3(Web3.givenProvider);
    const accounts = await webeProvider.eth.getAccounts();

    this.setState({ account: accounts[0] });
    console.log("Sender :  " + accounts[0]);

  

    const instance = new web3.eth.Contract(
      contract,
      contractAddress
    );

    await instance.methods
      .safeMint(this.state.mintValue)
      .send({
        from: accounts[0],
        value:this.state.balance * this.state.mintValue
      });

    const totalSupply = await instance.methods.totalSupply().call();
    this.setState({ totalSupply: totalSupply });
    console.log("Total Supply" + totalSupply);
  }

 async addd(){
   const a = this.state.mintValue;
   this.setState({ mintValue: this.state.mintValue + 1 });

  

 }
 async min(){
  if(this.state.mintValue < 1){
    this.setState({ mintValue : 0 });
  }
  else{
    this.setState({ mintValue: this.state.mintValue - 1 });
  }
  



 }

  async loadBlockchainData() {
    const web3 = window.web3;
    const webeProvider = new Web3(Web3.givenProvider);
    const accounts = await webeProvider.eth.getAccounts();

    this.setState({ account: accounts[0] });
    console.log("Sender :  " + accounts[0]);



    const instance = new web3.eth.Contract(
      contract,
      contractAddress
    );

    const totalSupply = await instance.methods.AuctionStatus().call();

    const symbol = await instance.methods.symbol().call();
    const balance = await instance.methods.price().call();
    const balancee = await instance.methods.TimeUntilNextStage().call();
    const totalsupply = await instance.methods.totalSupply().call();
    const  maxsupply = await instance.methods.maxSupply().call();
    const  maxmint = await instance.methods.maxMint().call();
      
    this.setState({ totalSupply: totalSupply });
    this.setState({ symbol: symbol });
    this.setState({ balance: balance });
    
   
    this.setState({ balancee: balancee});
    this.setState({ maxmint: maxmint});
    this.setState({ totalsupply: totalsupply });
    this.setState({ maxsupply: maxsupply });
    
    if(totalSupply === "Auction Has Not Started"){
      const  timestartauction = await instance.methods.TimeUntilAuctionStart().call();
      this.setState({ timestartauction: timestartauction });
      
    }
   
    



 }
  

  render() {
    return (
      
      <div  style={{  
        
        // backgroundImage: "url(" + Image + ")",
        // backgroundPosition: 'center',
        // backgroundSize: 'cover',
        // height: '100vh',
        // backgroundRepeat: 'no-repeat'
      }}>
        <div style={{zIndex:'-1'}}>

       
        <ParticleBackground  />
        </div>
        <div  id="mainhead" style={{zIndex:'1'}}>
        <div class="mnc">
            <div  id="connect"  class="connectBtn">
                <button style={{color : this.state.color}}  onClick={this.tryCon}  href="#">{this.state.conname}</button>
            </div>
        </div>
        <div className='App'>
          <div class="title">
            <h1>Exoplanets Infinity</h1>
            <p class="subTitle">by Starry Minds Club</p>
          </div>
          <div class="mainPanel">
            <div class="leftPanel">
              <div class="image1">
                <img src={Both} />
              </div>
            </div>
            <div class="centerPanel">
              <div class="centerTitle">
                <h1 class="timeLeftText">Time Until Mint</h1>
              </div>
              <div class="timeLeft">
                <h1 class="timeLeftData"> {this.state.TimeUntilAuctionStart = "Auction Has Not Started" ?   this.state.totalSupply : this.state.timestartauction}   </h1>
                {/* <h1>{this.state.timestartauction  ? this.state.timestartauction : this.state.totalSupply}   </h1>  */}
                {/* <h1>{this.state.totalSupply}</h1> */}
              </div>
              <div class="supply">
                <h1 class="supplyCalc">{this.state.totalsupply } / {this.state.maxsupply }</h1>
              </div>
              {/* ====== */}
              {/* <div class="quantity buttons_added">
                <input   type="button" value="-" class="minus"/><input  type="number" step="1" min="1" max="4" name="quantity" value="1" title="Qty" class="input-text qty text" size="4" pattern="" inputmode="" style={{ padding :"3%"}}   /><input type="button" value="+" class="plus"/>
              </div> */}

              <div class="quantity">
                <a class="quantity__minus" title="Decrement" onClick={this.min }><span style={{fontSize :"200%"}} > -</span></a>
                <input name="quantity" type="number"  class="quantity__input"   onChange={this.handleChange}  max={this.state.maxmint} value={this.state.mintValue} />
                <a class="quantity__plus" title="Increment" onClick={this.addd}><span style={{fontSize :"180%"}}>+</span></a>
              </div>
              {/* ===== */}
              <div id="mintbtn">
                {/* <h1  onClick={this.sendToken} style={{backgroundImage: "url(" + Mint + ")" ,  cursor:'pointer', backgroundRepeat: 'no-repeat' ,  backgroundPosition: 'center', zIndex:"1"
                }} >MINT</h1> */}
                 <div  id="connectt"  class="connectBtnn">
                <button  style={{cursor : "pointer"}}  onClick={this.sendToken}  href="#">Mint</button>
            </div>
              </div>

              {/* <div style={ { fontSize : '22px' , fontFamily : 'serif' , fontWeight: 'bold' , color:'white'  , textShadow: "0 2px 0 white"}}>
              <h1>Price Decoreases by 1/π Every 360 seconds </h1>       
              </div> */}

              <div class="currentPrice">
                <h1 class="currentPriceText">Current Price</h1>
              </div>
              <div>
                <h1 class="currentPriceVal"> {this.state.balance / 10 ** 18 + " " + "ETH"} </h1>
              </div>
              <div class="priceDecrease">
                <h1 class="priceDecreaseText">Price Decrease in</h1>
              </div>
              <div>
                <h1 class="decreasedBal"> { this.state.balancee >= 1  ?  (this.state.balancee + " " + "Second" ) : (this.state.balancee ) } </h1>
{/*                
                if(this.state.balancee === 1)
                  return <h1 class="decreasedBal"> {  this.state.balancee   } </h1>
              else
              return <h1 class="decreasedBal"> {  this.state.balancee + "" + "Second"   } </h1> */}


              </div>
            </div>
            <div class="rightPanel">
              <div class="image2">
                <img src={Both} />
              </div>
            </div>
          </div>
          <div>
            <h1 class="priceChangeText">Everytime Price changes , Start CountDown Timer at 360 seconds </h1>
          </div>
        </div>
      </div>
      </div>
     
    );
  }
}

export default App;
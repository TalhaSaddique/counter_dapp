import logo from "../logo.svg";
import React from "react";
import Web3 from "web3"
import detectEthereumProvider from "@metamask/detect-provider"
import counter from "../contracts/counter.json"


class Counter extends React.Component {
    async componentDidMount() {
        await this.loadWeb3();
        await this.loadAccount();
        await this.loadContract();
    }

    async loadWeb3() {
        this.setState({loading:true})
        const provider =await detectEthereumProvider();
        if (provider) {
            await provider.request({method: "eth_requestAccounts"})
            window.web3 = new Web3(provider)
        }else {
            window.alert("Non-Ethereum Browser Detected. You should consider trying MetaMask!")
        }
        this.setState({loading:false})
    }

    async loadAccount() {
        this.setState({loading:true})
        const account =await window.web3.eth.getAccounts();
        this.setState({account:account.toString()})
        this.setState({loading:false})
    }
    
    async loadContract() {
        this.setState({loading:true})
        const networkId = await window.web3.eth.net.getId();
        const counterData = counter.networks[networkId]
        const Counter = await new window.web3.eth.Contract(counter.abi , counterData.address);
        this.setState({Counter:Counter})
        this.setState({loading:false})
    }

    async increment(){
        await this.state.Counter.methods.increment().send({from: this.state.account});
        let setCount = await this.state.Counter.methods.counter().call()
        this.setState({count :setCount})
    }

    constructor(props){
        super(props)
        this.state = {
            account: "",
            Counter: null,
            count:null,
            loading:true
        }
        this.increment = this.increment.bind(this);
    }

  render() {
    return (
        this.state.loading === true? <h2> Loading... </h2> :
      <div>
        <h4 style={{position:'absolute',right:10,fontSize: 25,fontWeight:'bold',fontFamily:'Courier-BoldOblique',}}>{this.state.account? <>🟢Wallet Connected <br /> {this.state.account}</> : <>🔴Wallet Not Connected</>}</h4>
        <img src={logo} alt="logo" width={200} />
        <div>
            <h2>{this.state.count}</h2>
        <button  className='btn btn-primary btn-block block-lg' style={{width:400}} onClick ={this.increment}><h5>Count</h5></button>
        </div>
      </div>
    );
  }
}

export default Counter;

import React, { Component } from 'react';
import fire from '../../config/firebaseConfig';
import 'firebase/database'
import './Tracker.css';
import Transaction from './transaction/Transaction';

class Tracker extends Component {

    state={
        transactions:[],
        money: 0,

        transactionName:'',
        transactionType:'',
        price:'',
        currentUID: fire.auth().currentUser.uid
    }

    // logout
    logout = () => {
        fire.auth().signOut();
    }

    handleChange = input => e => {
        this.setState({
            //to avoid select > option - Type
            [input]: e.target.value !== "0" ? e.target.value : ""
        })
    }

    addNewTransaction = () => {
        const {
            transactionName,
            transactionType,
            price,
            currentUID,
            money
        } = this.state;

        if(transactionName && transactionType && price){
            const BackUpState = this.state.transactions;
            BackUpState.push({
                id: BackUpState.length + 1,
                name: transactionName,
                type: transactionType,
                price: price,
                user_id:currentUID
            });

            // console.log(BackUpState)
            fire.database().ref('Transactions/' + currentUID).push({
                id:BackUpState.length,
                name:transactionName,
                type:transactionType,
                price:price,
                user_id:currentUID
            }).then((data)=>{
                //success
                console.log("success");
                this.setState({
                    transactions:BackUpState,
                    money: transactionType === 'deposit' ?
                    money + parseFloat(price) :
                    money - parseFloat(price),
                    transactionName:'',
                    transactionType:'',
                    price:''
                })
            }).catch((error) => {
                //error
                console.log('error', error)
            });
        }
    }

    componentWillMount(){
        const { currentUID, money} = this.state
        let totalMoney = money;
        const backUpState = this.state.transactions;
        fire.database().ref('Transactions/' + currentUID)
        .once('value', (snapshot) => {
            // console.log(snapshot)
            snapshot.forEach((childSnapshot) => {

                totalMoney = 
                childSnapshot.val().type === 'deposit' ?
                parseFloat(childSnapshot.val().price) + totalMoney :
                totalMoney - parseFloat(childSnapshot.val().price);

                backUpState.push({
                    id:childSnapshot.val().id,
                    name:childSnapshot.val().name,
                    type:childSnapshot.val().type,
                    price:childSnapshot.val().price,
                    user_id:childSnapshot.val().user_id,
                });
            });
            this.setState({
                transactions: backUpState,
                money: totalMoney
            })
        })
    }

    render() {

        var currentUser = fire.auth().currentUser;
        return (
            <div>
                <nav className="navbar bg-light px-4">
                    <span className="navbar-brand mb-0 h1 displayName">Welcome, {currentUser.displayName}</span>
                    <span className="navbar-brand mb-0 h1"><button className="btn"
                        onClick={this.logout}
                    >Logout</button></span>
                </nav>
                <div className="trackerBlock">
                <div className="totalMoney">$ {this.state.money}</div>

                <div className="newTransactionBlock">
                    <div className="newTransaction">
                        <form>
                            <input
                                placeholder="Transaction Name"
                                type="text"
                                name="transactionName" 
                                value={this.state.transactionName}
                                onChange={this.handleChange('transactionName')}/>

                            <div className="inputGroup">
                                <select name="type"
                                value={this.state.transactionType}
                                onChange={this.handleChange('transactionType')}
                                >
                                    <option value="0">Type</option>
                                    <option value="expense">Expense</option>
                                    <option value="deposit">Deposit</option>
                                </select>

                                <input
                                    placeholder="Price"
                                    type="text"
                                    name="price" 
                                    value={this.state.price}
                                    onChange={this.handleChange('price')}/>
                            </div>
                           </form>

                           <button onClick={()=> this.addNewTransaction()}
                           className="addTransaction">+ Add Transaction</button>
                       
                    </div>
                </div>
                <div className="latestTransactions">
                    <p>Latest Transactions</p>
                    <ul>
                        {
                            Object.keys(this.state.transactions).map((id) => (
                                <Transaction key={id}
                                type={this.state.transactions[id].type}
                                name={this.state.transactions[id].name}
                                price={this.state.transactions[id].price}
                                />
                            ))
                        }
                    </ul>
                </div>
            </div>
            </div>
        );
    }
}

export default Tracker;
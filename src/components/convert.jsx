import React from 'react'
import axios from "axios";

class Converter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            fromCurrency: "SEK",
            toCurrency: 'USD',
            amount: 200,
            currencies: []
        };
    }

    componentDidMount() {
        axios
            .get("https://api.exchangeratesapi.io/latest?symbols=USD,GBP,SGD")
            .then(response => {
                const currencyAr = [''];
                for (const key in response.data.rates) {
                    currencyAr.push(key);
                }
                this.setState({currencies: currencyAr});
            })
            .catch(err => {
                console.log("oppps", err);
            });
    }

    convertHandler = () => {
        if (this.state.fromCurrency !== this.state.toCurrency) {
            axios
                .get(`https://api.exchangeratesapi.io/latest?base=${this.state.fromCurrency}&symbols=${this.state.toCurrency}`)
                .then(response => {
                    const result = this.state.amount * (response.data.rates[this.state.toCurrency]);
                    this.setState({
                        result: result.toFixed(2)
                    });
                })
                .catch(error => {
                    console.log("Opps", error.message);
                });
            this.checkHistoricalRates();
        }
    };

    checkHistoricalRates = () => {
        const startDate = '2015-03-26';
        const endDate = '2017-06-13';
        if (this.state.fromCurrency !== this.state.toCurrency) {
            axios
                .get(`https://api.exchangeratesapi.io/history?start_at=2015-03-26&end_at=2017-06-13&base=${this.state.fromCurrency}&symbols=${this.state.toCurrency}`)
                .then(response => {
                    const startDateValue = this.state.amount * (response.data.rates[startDate][this.state.toCurrency]);
                    const endDateValue = this.state.amount * (response.data.rates[endDate][this.state.toCurrency]);
                    const diff = endDateValue - startDateValue;
                    const resultStr = `Value on ${startDate} = ${startDateValue.toFixed(2)} Value on ${endDate} = ${endDateValue.toFixed(2)}; Diff=${diff.toFixed(2)}`;
                    this.setState({resultHist: resultStr});
                })
                .catch(error => {
                    console.log("Opps", error.message);
                });
        }
    };

    selectHandler = event => {
        if (event.target.name === "from") {
            this.setState({fromCurrency: event.target.value});
        } else {
            if (event.target.name === "to") {
                this.setState({toCurrency: event.target.value});
            }
        }
    };

    render() {
        return (
            <div className="Converter">
                <div className="Form">
                    <label basic>kr</label>
                    <input
                        name="amount"
                        type="text"
                        value={this.state.amount}
                        onChange={event => this.setState({amount: event.target.value})}/>
                    <select
                        name="to"
                        onChange={event => this.selectHandler(event)}
                        value={this.state.toCurrency}>
                        {this
                            .state
                            .currencies
                            .map(cur => (
                                <option key={cur}>{cur}</option>
                            ))}
                    </select>
                    <button onClick={this.convertHandler}>Convert</button>
                    {this.state.result && <h3>{this.state.result}</h3>}
                    {this.state.resultHist && <h3>{this.state.resultHist}</h3>}
                </div>
            </div>
        );
    }
}
export default Converter;
import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function () {

    const kitties = [
        {category: "male", age: "4", likesKids: true, name: "Fidel Catstro"},
        {category: "male", age: "9", likesKids: true, name: "Hairy Potter"},
        {category: "male", age: "2", likesKids: false, name: "Grumpy"},
        {category: "female", age: "1", likesKids: true, name: "Jude Paw"},
        {category: "female", age: "2", likesKids: false, name: "Lucifurr"},
        {category: "female", age: "3", likesKids: true, name: "Meowly Cyrus"}
    ];

    class CatTable extends React.Component {
        render() {
            let rows = [];
            let lastCategory = null;
            this.props.kitties.forEach((kitty) => {
                    if (kitty.category !== lastCategory) {
                        rows.push(<CatCategoryRow category={kitty.category} key={kitty.category}/>);
                        lastCategory = kitty.category;
                    }
                    console.log(this.props.filterText, this.props.likesKids);
                    if (this.props.filterText === '') {
                        if (this.props.likesKids === false) {
                            rows.push(<CatRow kitty={kitty} key={kitty.name}/>);
                        } else if (kitty.likesKids === true) {
                            rows.push(<CatRow kitty={kitty} key={kitty.name}/>);
                        }
                    } else if (this.props.filterText !== '') {
                        if (this.props.likesKids === false && kitty.name.indexOf(this.props.filterText) >= 0) {
                            rows.push(<CatRow kitty={kitty} key={kitty.name}/>);
                        } else if (kitty.likesKids === true && kitty.name.indexOf(this.props.filterText) >= 0) {
                            rows.push(<CatRow kitty={kitty} key={kitty.name}/>);
                        }
                    }
                });
            return (
                <table>
                <thead>
                <tr>
                    <th>NAME</th>
                    <th>AGE</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
                </table>
            )
        }
    }

    class CatRow extends React.Component {
        render() {
            const name = this.props.kitty.likesKids ?
                this.props.kitty.name : <span style={{color: 'red'}}>
                    {this.props.kitty.name}</span>;
            return <tr>
                <td>{name}</td>
                <td>{this.props.kitty.age}</td>
            </tr>;
        }

    }
        class CatCategoryRow extends React.Component {
        render() {
            return  <tr>
                <th colSpan = "2">{this.props.category}</th>
                    </tr>;
        }
    }


    class SearchBar extends React.Component {
        render() {
            return <form>
                <input type = "text"
                       onChange = {this.props.changeText}
                       value = {this.props.filterText}
                       placeholder="Search.."/>
                <p>
                    <label htmlFor={'check'}
                           className={'checkbox'}>
                        <input id={'check'}
                               type="checkbox"
                               checked={this.props.likesKids}
                               onChange={this.props.onChange}/>
                       Show only that kitties which likes kids!</label>
                </p>
            </form>
        }
    }

    class App extends React.Component {
        constructor(props){
            super(props);

            this.state = {
                filterText: '',
                likesKids: false
            }
        }

        handleChangeText = (e) => {
            this.setState({
                filterText: e.target.value,
            })
        };
        handleChange = () => {
            this.setState({
                likesKids: this.state.likesKids ? false : true,
            })
        };

        render() {
            return (
                <div className={'findKitty'}>
                    <h1>Find your Kitty!</h1>
                    <SearchBar
                        onChange = {this.handleChange}
                        changeText = {this.handleChangeText}
                        filterText = {this.state.filterText}
                        likesKids = {this.state.likesKids}
                    />
                    <CatTable
                        kitties = {this.props.kitties}
                        filterText = {this.state.filterText}
                        likesKids = {this.state.likesKids}
                    />
                </div>
            )
        }
    }

    ReactDOM.render(
        <App kitties={kitties}/>,
        document.getElementById('app')
    );
});
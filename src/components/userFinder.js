import { Fragment, useState, useEffect, Component } from 'react';
import UsersContext from '../store/user-context';
import ErrorBoundray from './ErrorBoundray';
import classes from "./userFinder.module.css";
import Users from './Users';


const DUMMY_USERS = [
    { id: 'u1', name: 'Max' },
    { id: 'u2', name: 'Manuel' },
    { id: 'u3', name: 'Julie' },
];

class userFinder extends Component {

    static contextType = UsersContext;

    constructor() {
        super()

        this.state = {
            filteredUsers: DUMMY_USERS,
            searchTerm: ""
        }
    }

    componentDidMount() {
        //sent http request....
        this.setState({ filteredUsers: this.context.users })
    }

    //called when copment reavluated
    componentDidUpdate(prevProps, prevState) {

        //to prevent infinte loop because setstae rexcute the component
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.setState({
                filteredUsers: this.context.users.filter(user => user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
            })
        }


        if(this.context.users.length === 0){
            throw new Error("no users provided")
        }

    }

    searchChangeHandler(event) {
        this.setState({ searchTerm: event.target.value })
    }

    render() {
        return (
            <Fragment>
                <div className={classes.finder}>
                    <input type='search' onChange={this.searchChangeHandler.bind(this)} />
                </div>
                <ErrorBoundray>
                    <Users users={this.state.filteredUsers} />
                </ErrorBoundray>

            </Fragment>
        );
    }
}



// const UserFinder = () => {
//     const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         setFilteredUsers(
//             DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//         );
//     }, [searchTerm]);

//     const searchChangeHandler = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     return (
//         <Fragment>
//             <div className={classes.finder}>
//                 <input type='search' onChange={searchChangeHandler} />
//             </div>
//             <Users users={filteredUsers} />
//         </Fragment>
//     );
// };

export default userFinder;
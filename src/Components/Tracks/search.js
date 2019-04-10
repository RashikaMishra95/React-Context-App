import React , {Component} from 'react';
import {Consumer} from '../../context';
import axios from 'axios';

class Search extends Component{
    state={
      title:'',
    };

    handleTitle=(e)=>{
        const {name,value}=e.target;
        this.setState({
            [name]:value
        })
    };

    handleSearch=(dispatch,e)=>{
        e.preventDefault();
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.title}&page_size=7&page=1&s_track_rating=desc&apikey=${
            process.env.REACT_APP_MM_KEY
            }`)
            .then(res=>
            {
                 dispatch({
                     type:'SEARCH_TRACKS',
                     payload:res.data.message.body.track_list
                 })
                this.setState({
                    title:''
                })
            })
            .catch( err=> console.log("Err---",err))
    };
    render(){
        return(
            <Consumer>
                {
                    value=>{
                       const {dispatch}=value;
                        return(
                            <div className={'card card-body mb-4 p-4'}>
                                <h2 className=" text-center">
                                    <i className="fas fa-music"/>Search for a song
                                </h2>
                                <p className={'text-center'}>Get Lyrics of any song</p>
                                <form onSubmit={this.handleSearch.bind(this,dispatch)}>
                                    <div className="form-group">
                                        <input
                                            type={'text'}
                                            className={'form-control form-control-lg'}
                                            value={this.state.title}
                                            onChange={this.handleTitle}
                                            placeholder={'Search Song Title'}
                                            name={'title'}
                                        />
                                    </div>
                                    <button className={'btn btn-warning btn-lg btn-block mb-3'}>
                                        Get Track Lyrics
                                    </button>
                                </form>
                            </div>
                        )
                    }
                }
            </Consumer>
        )
    }
}
export default Search;
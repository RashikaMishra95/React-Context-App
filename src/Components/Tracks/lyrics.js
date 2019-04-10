import React from 'react';
import axios from 'axios';
import Spinner from "../Layouts/Spinner";
import {Link} from "react-router-dom";
import Moment from 'react-moment';
import moment from 'moment';

export class Lyrics extends React.Component{
    state={
        tracks :{},
        lyrics :{}
    };

    componentDidMount() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${
            process.env.REACT_APP_MM_KEY
            }`)
            .then(res => {
                this.setState({
                    lyrics: res.data.message.body.lyrics
                });
                return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${
                    process.env.REACT_APP_MM_KEY
                    }`)
                    .then(res => {
                    //    console.log("track---", res.data)
                        this.setState({
                            tracks: res.data.message.body.track
                        });
                    })
            })
            .catch(err => console.log("Err---", err))
    }

    render(){
        const {tracks,lyrics} = this.state;
        console.log("state", tracks);
        if(tracks===undefined || lyrics===undefined || Object.keys(tracks).length===0 || Object.keys(lyrics).length===0){
                    return <Spinner/>
            }
            else{
               return(
                   <React.Fragment>
                       <Link to={'/'} className={'btn btn-info mb-4'}>Go Back</Link>
                       <div className="card">
                           <h5 className="card-header">
                               {tracks.track_name} by  {''}
                               <span className="text-secondary">
                                   {tracks.artist_name}
                               </span>
                           </h5>
                           <div className="card-body">
                               <div className="card-text">
                                   <p>{lyrics.lyrics_body}</p>
                               </div>
                           </div>
                           <ul className="list-group mt-3">
                               <li className="list-group-item">
                                   <strong>Album Id : {tracks.album_id}</strong>
                               </li>
                               <li className="list-group-item">
                                   <strong>Release Date : <Moment format={'MM/DD/YYYY'}>{tracks.updated_time}</Moment></strong>
                               </li>
                               {/*<strong>Release Date : {moment(tracks.updated_time).format('MM DD YYYY')}</strong>*/}
                           </ul>

                       </div>
                   </React.Fragment>
               )
            }
    }
}
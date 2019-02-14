const React = require('react');

module.exports = props =>
    <div className="container valentines-dino">
        <div className="sub-container">
            <img src={props.heart} alt="" className="heart move-vertical"/>
        </div>
        <div className="sub-container c2">
            <img src={props.heart} alt="" className="heart move-vertical"/>
        </div>
        <div className="sub-container c3">
            <img src={props.heart} alt="" className="heart move-vertical"/>
        </div>

        <img src={props.dino} alt="" className="t-regx"/>
    </div>;

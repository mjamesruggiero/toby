var $ = require('jquery');
var React = require('react');
var url = require('url');
var moment = require('moment');

var NewsItem = React.createClass({
    getDomain: function() {
        return url.parse(this.props.item.url).hostname;
    },

    getRank: function() {
        return(
            <div className="newsItem-rank">
                {this.props.rank}
            </div>
        );
    },

    getVote: function() {
        return(
            <div className="newsItem-vote">
                <a href={'https://news.ycombinator.com/vote?for=' + this.props.item.id + '&dir=up&whence=news'}>
                    <img src="../img/grayarrow2x.gif" width="10"/>
                </a>
            </div>
        );
    },

    getCommentLink: function() {
        var commentLink = 'discuss';
        if (this.props.item.kids && this.props.item.kids.length) {
            // This only counts top-level comments.
            // To get the full count, recursively get item details for this news item
            commentText = this.props.item.kids.length + ' comments';
        }
        return (
            <a href={'https://news.ycombinator.com/item?id=' + this.props.item.id}>{commentText}</a>
        );
    },

    getSubText: function() {
        return(
            <div className="newsItem-subtext">
                {this.props.item.score} points by <a href={'https://news.ycombinator.com/user?id=' + this.props.item.by}>{this.props.item.by}</a> {moment.utc(this.props.item.time * 1000).fromNow()} | {this.getCommentLink()}
            </div>
        );
    },

    getTitle: function() {
        return(
            <div className="newsItem-title">
                <a className="newsItem-titleLink" href={this.props.item.url}>{this.props.item.title}</a>
                <span className="newsItem-domain">
                    ({this.getDomain()})
                </span>
            </div>
        );
    },

    render: function() {
        return(
            <div className="NewsItem">
                {this.getRank()}
                {this.getVote()}
                <div className="newsItem-itemText">
                  {this.getTitle()}
                  {this.getSubText()}
                </div>
            </div>
        );
    }
});

module.exports = NewsItem;

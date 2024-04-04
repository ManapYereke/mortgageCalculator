import React from 'react';

const Article = ({ article, title}) => {

    return (
        <div>
            <div className="big-text bold title">{title}</div>
            <p className="article">
            <div className="text normal">{article}</div>
        </p>
        </div>
    );
}

export default Article;

import React from 'react';

const Article = ({ article, title }) => {

    return (
        <div>
            <div className="big-text bold title">{title}</div>
            <div className="article">
                <div className="text normal">{article}</div>
            </div>
        </div>
    );
}

export default Article;

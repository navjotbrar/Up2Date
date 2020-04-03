import * as React from "react";
import { Jumbotron } from "react-bootstrap";
import styled from "styled-components";
import Posts from "./posts.jsx";
import "./landingpage.css";
import { fetchPosts } from "../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const PostsJumbo = styled(Jumbotron)`
	padding: 1rem 2rem;
	// background-color: red;
	width: 80%;
    max-width: 1000px;
    margin-top: 50px;
    text-align: center;
`
const FormDiv = styled.div`
	display: flex;
	justify-content: center;
	padding: 20px;
	text-align: left;
`
const Title = styled.h1`
    // font-size: 28px;
    margin-bottom: 20px;
`
// props:
// amount = amount of posts to load
// author = who's posts to load
// title = what to title the list, ie: <user>'s posts
class PostList extends React.Component {
    state = {
        posts: []
    };

    async componentDidMount(){
        await this.test();
    }

    test = async () => {
        await this.props.fetchPosts();
        
        this.getNews(await this.props.feed);
    }
    getNews(input) {
        const articles = input;     //articles = posts.postList
        let articleRows = [];
        let i = 0;
    
        articles.forEach(article => {
            if(i >= +this.props.amount)
                return;
            
            if(typeof this.props.author != 'undefined'){
                if(article.author == this.props.author){
                    const currentArticle = <Posts info={article} deletable = 'true' />;
                    articleRows.push(currentArticle);
                } 
            } else{
                const currentArticle = <Posts info={article} deletable = 'false' />;
                articleRows.push(currentArticle);
            }
            i++;
        });

        this.setState({ 
            posts: articleRows 
        });
    }
    render() {
        return (
            <>
            <FormDiv>
                <PostsJumbo>
                    <Title>
                        { typeof this.props.title == 'undefined'
                            ? <>Posts</>
                            : <>{this.props.title}</>
                        }
                    </Title>
                    {this.state.posts}
                </PostsJumbo>
            </FormDiv>
            </>
        );
    }
    
}
const mapStateToProps = state => {
    return {
      feed: state.posts.postList
    };
};
export default connect(mapStateToProps, { fetchPosts: fetchPosts })(
    withRouter(PostList)
);
import * as React from "react";
import { Jumbotron} from "react-bootstrap";
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

class SearchPostList extends React.Component {
    state = {
        posts: []
    };

    async componentDidMount(){
        await this.test();
        // console.log("in postList didMount")
    }

    test = async () => {
        await this.props.fetchPosts();
        this.getNews(await this.props.feed);
    }
    getNews(input) {
        const articles = input;     //articles = posts.postList
        let articleRows = [];
        let tirtiaryRows = [];
        let i = 0;
        console.log(this.props.search + " yuh");
    
        articles.forEach(article => {
            if(i >= +this.props.amount)
                return;
            
            if(typeof this.props.search != 'undefined' && this.props.search != " "){
                if(article.author.toUpperCase() == this.props.search.toUpperCase()){
                    const currentArticle = <Posts info={article} />;
                    articleRows.push(currentArticle);
                }
                else if(article.title.toUpperCase() == this.props.search.toUpperCase()){
                    const currentArticle = <Posts info={article} />;
                    articleRows.push(currentArticle);
                }
                else if(article.title.toUpperCase() != this.props.search.toUpperCase() && article.author.toUpperCase() != this.props.search.toUpperCase()){
                    const currentArticle = <Posts info={article} />;
                    tirtiaryRows.push(currentArticle);
                }
            } 
            i++;
        });

        let x = 0;
        if(typeof this.props.search != 'undefined' && this.props.search != " " ){
        let res = this.props.search.split(" ");
        console.log(res);
        tirtiaryRows.forEach(post => {
            if(x >= +this.props.amount)
                return;
        
                for(let word of res){
                    if(post.props.info.title.toUpperCase().includes(word.toUpperCase()) || post.props.info.author.toUpperCase().includes(word.toUpperCase())){
                        const currentArticle = <Posts info={post.props.info} />;
                        articleRows.push(currentArticle);
                        break;
                    } 
                }
            x++;
        });
    }
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
    withRouter(SearchPostList)
);
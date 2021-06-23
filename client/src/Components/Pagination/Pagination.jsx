import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import useStyles from './styles'; 
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../redux/reducers/actions/postsActions/getAllPosts';

const Paginate = ({ page }) => {
    
    const classes = useStyles();
    const dispacth = useDispatch();
    const { numberOfPage, currentPage } = useSelector(state => state.postsReducer);

    useEffect(() => {
        if(page) dispacth(getAllPosts(page));
    },[page]);

    return(
        <Pagination 
            classes={{ ul: classes.ul}}
            count={numberOfPage}
            page={currentPage}
            variant='outlined'
            color='primary'
            renderItem={item => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )
}

export default Paginate;
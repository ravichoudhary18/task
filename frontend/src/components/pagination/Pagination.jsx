import {useContext} from 'react';
import './Pagination.css';
import { TaskPagination } from '../../tasks/TaskAPI';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { showErrorToast } from '../../utils/toastNotifications';
import { usePagination } from '../../hooks/usePagination';
import MainContext from '../../context/MainContext';


export const Pagination = ({ pagination, setPagination, setRecord }) => {
    const axiosPrivate = useAxiosPrivate();

    const currentPage = getCurrentPage(pagination.next, pagination.previous);
    const totalCount = pagination.count
    const pageSize=12
    const siblingCount = 1
    const {setIsLoading} = useContext(MainContext)

    const paginationRange = usePagination({totalCount, pageSize, siblingCount, currentPage});

    const fetchClaimArray = async (page) => {
        try {
            setIsLoading(true)
            const response = await TaskPagination(axiosPrivate, page);
            if (response.status === 200) {
                setRecord(response.data.results);
                setPagination((prev) => ({
                    ...prev,
                    next: response.data?.next,
                    previous: response.data?.previous,
                    count: response.data?.count,
                }));
            }
        } catch (error) {
            showErrorToast(`Failed to fetch Claim list: error:${error.response.status}`, 2000);
        }
        finally {
            setIsLoading(false)
        }
    };

    function getParams(url) {
        let parsedUrl = new URL(url);
        let page_params = parsedUrl.searchParams.get('page');
        return page_params
    }

    function getCurrentPage(next, previous) {
        let currentPage = 1; // Default page is 1

        if (next && typeof next === 'string') {
            // Extract the page number from the next URL
            const nextPage = getParams(next);
            currentPage = parseInt(nextPage) - 1;
        } else if (previous && typeof previous === 'string') {
            // Extract the page number from the previous URL
            const prevPage = getParams(previous);
            currentPage = parseInt(prevPage) + 1;
        }
        return currentPage;
    }

    const genrateURL = (url, newPageValue) => {
        let parsedUrl = new URL(url);
    
        // Update the 'page' parameter value
        parsedUrl.searchParams.set('page', newPageValue.toString());
        
        // Return the updated URL string
        return parsedUrl.toString();
    }

    const onPageChange = (page, url) => {
        if(page ==='...' || [null, undefined].includes(url)){
            return
        }
        const endPoint = genrateURL(url, page).split('api/')[1]
        fetchClaimArray(endPoint);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul className={`pagination-container`}>
        <li
          className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => onPageChange(currentPage - 1, pagination.previous)}
        >
          <div className="arrow left" />
        </li>
        {paginationRange.map(pageNumber => (
          <li
            key={Math.random().toString(36).slice(2, 7)}
            className={`pagination-item ${pageNumber === currentPage ? 'selected disabled' : ''}`}
            onClick={() => onPageChange(pageNumber, pagination.next ? pagination.next : pagination.previous)}
          >
            {pageNumber === '...' ? <span className="dots">&#8230;</span> : pageNumber}
          </li>
        ))}
        <li
          className={`pagination-item ${currentPage === lastPage ? 'disabled' : ''}`}
          onClick={() => onPageChange(currentPage + 1, pagination.next)}
        >
          <div className="arrow right" />
        </li>
      </ul>
    );
};
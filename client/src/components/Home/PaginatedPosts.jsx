import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { useDispatch, useSelector } from "react-redux";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Button } from "react-bootstrap";

const PaginatedPosts = ({ deletePost }) => {
  const navigate = useNavigate();

  const { userID } = useSelector((state) => state.userID);
  const { posts } = useSelector((state) => state.posts);

  // pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(posts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(posts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, posts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % posts.length;
    setItemOffset(newOffset);
  };
  // endPagination

  return (
    <section className="posts">
      <>
        {currentItems.map((item) => (
          <div className="post" key={item._id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <div className="flex">
              <small className="text-muted">
                {capitalizeFirstLetter(item.user.name)}
              </small>
              <ButtonGroup>
                <Button
                  className="me-2"
                  variant="outline-info"
                  onClick={() => navigate(`/details/${item._id}`)}
                >
                  Read more
                </Button>
                {item.user.id == userID && (
                  <Button
                    variant="outline-danger"
                    onClick={() => deletePost(item._id)}
                  >
                    Delete
                  </Button>
                )}
              </ButtonGroup>
            </div>
          </div>
        ))}
      </>

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </section>
  );
};

export default PaginatedPosts;

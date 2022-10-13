import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Button } from "react-bootstrap";

const PaginatedPosts = ({ posts }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

  const navigate = useNavigate();

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(posts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(posts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, posts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % posts.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

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
              <Button
                variant="outline-info"
                onClick={() => navigate(`/${item._id}/details`)}
              >
                Read more
              </Button>
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

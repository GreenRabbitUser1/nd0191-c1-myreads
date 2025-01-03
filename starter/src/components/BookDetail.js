import propTypes from "prop-types";
import isEmpty from "../utils/isEmpty";

const BookDetail = ({label, value, fieldType}) => {

    return (
        
        <div className="book-detail-wrap">
            <label className="book-detail-label">
                {label}
            </label>
            {
                (fieldType === 'string' ?
                    <div className="book-detail">
                        {value}
                    </div> : <div></div>
                ) 
            }
            {
                (fieldType === 'array' ?
                    <div className="book-detail">
                        {!isEmpty(value) ? value.join(', ') : ''}
                    </div> : <div></div>
                )
            }
            {
                (fieldType === 'date' ? 
                    <div className="book-detail">
                        {!isEmpty(value) ? new Date(value).toLocaleDateString() : ''}
                    </div> : <div></div>
                )
            }
            {
                (fieldType === 'number' ?
                    <div className="book-detail">
                        {!isEmpty(value) ? new Date(value).toLocaleDateString() : ''}
                    </div> : <div></div>
                )
            }
            {
                (fieldType === 'link' ? 
                    <div className="book-detail">
                        {value ? <a href={value}>{value}</a> : 'Not found'}
                    </div> : <div></div>
                ) 
            }
        </div>
    )

};

BookDetail.propTypes = {
    label: propTypes.string.isRequired,
    fieldType: propTypes.string.isRequired
};

export default BookDetail;
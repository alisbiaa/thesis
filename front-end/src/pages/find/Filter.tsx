import React from 'react';
import {IQuestion} from "../../static/interfaces";


type propTypes = {
    data: IQuestion[];
}
const Filter = ({data} : propTypes) => {
    return (
        <div>
            {/*<Row>*/}
            {/*    <div>*/}
            {/*        <span>{data.length} questions</span>*/}
            {/*        <button*/}
            {/*            type="button"*/}
            {/*            className="border-1 border-dark btn btn-light float-end"*/}
            {/*            data-bs-toggle="collapse"*/}
            {/*            aria-expanded="false"*/}
            {/*            data-bs-target="#flush-collapseOne"*/}
            {/*            aria-controls="flush-collapseOne"*/}
            {/*        >*/}
            {/*            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*/}
            {/*                 className="bi bi-filter" viewBox="0 0 16 16">*/}
            {/*                <path*/}
            {/*                    d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>*/}
            {/*            </svg>*/}
            {/*            {"\t"} Filter*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</Row>*/}
            {/*<Row>*/}
            {/*    <div id="flush-collapseOne" className="accordion-collapse collapse">*/}
            {/*        <div className="accordion-body">*/}
            {/*            <Row>*/}
            {/*                <Col>*/}
            {/*                    <p className={"fw-bold"}>*/}
            {/*                        Filter by*/}
            {/*                    </p>*/}
            {/*                    <div className="form-check">*/}
            {/*                        <input className="form-check-input" type="checkbox" value=""/>*/}
            {/*                            <label className="form-check-label">*/}
            {/*                                Hidden*/}
            {/*                            </label>*/}
            {/*                    </div>*/}
            {/*                    <div className="form-check">*/}
            {/*                        <input className="form-check-input" type="checkbox" value=""/>*/}
            {/*                            <label className="form-check-label">*/}
            {/*                                No accepted answer*/}
            {/*                            </label>*/}
            {/*                    </div>*/}
            {/*                    <div className="form-check">*/}
            {/*                        <input className="form-check-input" type="checkbox" value=""/>*/}
            {/*                        <label className="form-check-label">*/}
            {/*                            No answers*/}
            {/*                        </label>*/}
            {/*                    </div>*/}
            {/*                    <div className="form-check">*/}
            {/*                        <input className="form-check-input" type="checkbox" value=""/>*/}
            {/*                        <label className="form-check-label">*/}
            {/*                            Important*/}
            {/*                        </label>*/}
            {/*                    </div>*/}
            {/*                </Col>*/}
            {/*                <Col>*/}
            {/*                    <p className={"fw-bold"}>*/}
            {/*                        Sorted by*/}
            {/*                    </p>*/}
            {/*                    <div className="form-check">*/}
            {/*                        <input className="form-check-input" type="radio" name="flexRadioDefault"*/}
            {/*                               id="flexRadioDefault1"/>*/}
            {/*                            <label className="form-check-label" htmlFor="flexRadioDefault1">*/}
            {/*                                Newest*/}
            {/*                            </label>*/}
            {/*                    </div>*/}
            {/*                    <div className="form-check">*/}
            {/*                        <input className="form-check-input" type="radio" name="flexRadioDefault"*/}
            {/*                               id="flexRadioDefault2"/>*/}
            {/*                            <label className="form-check-label" htmlFor="flexRadioDefault2">*/}
            {/*                                Department*/}
            {/*                            </label>*/}
            {/*                    </div>*/}
            {/*                    <div className="form-check">*/}
            {/*                        <input className="form-check-input" type="radio" name="flexRadioDefault"*/}
            {/*                               id="flexRadioDefault3"/>*/}
            {/*                        <label className="form-check-label" htmlFor="flexRadioDefault2">*/}
            {/*                            Subject*/}
            {/*                        </label>*/}
            {/*                    </div>*/}
            {/*                </Col>*/}
            {/*                <Col>*/}
            {/*                    <p className={"fw-bold"}>*/}
            {/*                        Tagged with*/}
            {/*                    </p>*/}
            {/*                    <input className="form-control me-2" type="search" placeholder="e.g. javascript or python"/>*/}

            {/*                </Col>*/}
            {/*            </Row>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Row>*/}


        </div>
    );
};

export default Filter;

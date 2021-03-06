import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';

const Education = ({education}) => {


    const educations=education.map(edu =>(
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td className="hide-sm">
                <Moment format="DD/MM/YYYY">{edu.from}</Moment> - 
                {edu.to === null ? " NOW": <Moment format="DD/MM/YYYY">{edu.from}</Moment> }
            </td>

            <td className="hide-sm"><button class="btn btn-danger">Delete</button></td>
        </tr>

    ));
    return (
        <Fragment>
                <h2 className="my-2">Education Credentials</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th className="hide-sm">Degree</th>
                            <th className="hide-sm">Years</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {educations}
                    </tbody>
                </table>
        </Fragment>
    )
}

Education.propTypes={
    education:PropTypes.array.isRequired
}

export default Education

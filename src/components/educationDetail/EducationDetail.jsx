import React, { Fragment, useEffect } from "react";
import Moment from "react-moment";
import { useDeleteEducation } from "../../hooks/useDeleteEducation";
import { withProfile } from "../../HOC/withProfile";

const EducationDetailComponent = ({ educationList, setProfileState }) => {
  const [result, setDeleteEducation] = useDeleteEducation();

  const deleteEducation = (id) => {
    setDeleteEducation({ id });
  };
  useEffect(() => {
    if (result.success) {
      const { profile } = result;
      setProfileState(profile);
    }
  }, [result]);
  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {educationList?.map(({ school, degree, from, to, _id }) => (
            <tr key={_id}>
              <td>{school}</td>
              <td className="hide-sm">{degree}</td>
              <td className="hide-sm">
                <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
                {to === null || "" ? (
                  "Now"
                ) : (
                  <Moment format="YYYY/MM/DD">{to}</Moment>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEducation(_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export const EducationDetail = withProfile(EducationDetailComponent);

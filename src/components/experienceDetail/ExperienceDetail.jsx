import React, { Fragment, useEffect } from "react";
import Moment from "react-moment";
import { useDeleteExperience } from "../../hooks/useDeleteExperience";
import { withProfile } from "../../HOC/withProfile";

export const ExperienceDetailComponent = ({
  experienceList,
  setProfileState,
}) => {
  const [result, setDeleteExperience] = useDeleteExperience();

  const deleteExperience = (id) => {
    setDeleteExperience({ id });
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
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {experienceList?.map(({ company, title, from, to, _id }) => (
            <tr key={_id}>
              <td>{company}</td>
              <td className="hide-sm">{title}</td>
              <td className="hide-sm">
                <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
                {to == null || "" ? (
                  "Now"
                ) : (
                  <Moment format="YYYY/MM/DD">{to}</Moment>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteExperience(_id)}
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
export const ExperienceDetail = withProfile(ExperienceDetailComponent);

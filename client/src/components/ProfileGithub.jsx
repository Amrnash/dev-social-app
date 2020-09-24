import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Spinner, Card, Badge } from "react-bootstrap";
import { getGithubRepos } from "../actions/profile";

const ProfileGithubComponent = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    console.log(username);
    getGithubRepos(username);
  }, []);
  return (
    <>
      {repos === null ? (
        <Spinner
          animation="border"
          style={{
            height: 60,
            width: 60,
            fontSize: 16,
            marginLeft: "50%",
            marginTop: "40%",
          }}
        />
      ) : (
        repos.map((repo) => (
          <Card
            key={repo._id}
            className="p-4 d-flex justify-content-between flex-row"
          >
            <div>
              <h4>
                <a href={repo.html_url} target="_blank">
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul className="d-flex flex-column" style={{ listStyle: "none" }}>
                <li>
                  <Badge variant="info">Stars: {repo.stargazers_count}</Badge>
                </li>
                <li>
                  <Badge variant="light">
                    {" "}
                    Watchers: {repo.watchers_count}
                  </Badge>
                </li>
                <li>
                  <Badge variant="dark">Forks: {repo.forks_count}</Badge>
                </li>
              </ul>
            </div>
          </Card>
        ))
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});
ProfileGithubComponent.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};
const ProfileGithub = connect(mapStateToProps, { getGithubRepos })(
  ProfileGithubComponent
);
export { ProfileGithub };

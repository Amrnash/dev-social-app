import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";

const AlertMsgComponent = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <Alert
        key={alert.id}
        variant={`${alert.alertType}`}
        style={{ marginTop: 50 }}
      >
        {alert.msg}
      </Alert>
    ))
  );
};

AlertMsgComponent.propTypes = {
  alerts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  alerts: state.alert,
});
const AlertMsg = connect(mapStateToProps)(AlertMsgComponent);
export { AlertMsg };

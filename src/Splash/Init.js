import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { appInitService } from 'your-app-init-service'; // Replace with the actual import path for your appInitService

const Init = (props) => {
  const { navigation, dispatch } = props;

  useEffect(() => {
    dispatch(appInitService.initApp(navigation));
  }, [dispatch, navigation]);

  return null;
};

export default connect()(Init);

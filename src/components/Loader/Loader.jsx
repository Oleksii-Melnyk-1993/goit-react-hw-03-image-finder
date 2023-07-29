import PropTypes from 'prop-types';

export const Loader = ({ children }) => {
  return <div>{children}</div>;
};

Loader.propTypes = {
  children: PropTypes.node.isRequired,
};

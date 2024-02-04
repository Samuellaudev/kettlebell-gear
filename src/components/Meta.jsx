import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To Kettlebell Gear',
  description: 'Explore premium kettlebell selections for your fitness journey!',
  keywords: 'kettlebell, sports equipment',
};

export default Meta;
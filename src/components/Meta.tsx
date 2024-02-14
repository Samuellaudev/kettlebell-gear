import { Helmet } from 'react-helmet-async';

interface MetaProps {
  title: string;
  description: string;
  keywords: string;
}

const Meta = ({
  title = 'Welcome To Kettlebell Gear',
  description = 'Explore premium kettlebell selections for your fitness journey!',
  keywords = 'kettlebell, sports equipment'
}: MetaProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

export default Meta;
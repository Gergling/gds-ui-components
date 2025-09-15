import { Box } from "@mui/material";
import { BlogSummary, BlogSummaryProps } from "./BlogSummary";

export type BlogListProps = {
  articles: BlogSummaryProps[];
};

export const BlogList = ({
  articles,
}: BlogListProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 2,
      }}
    >
      {articles.map((article, key) => <BlogSummary
        key={key}
        {...article}
      />)}
    </Box>
  )
};

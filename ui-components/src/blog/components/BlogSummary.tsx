import {
  Card,
  CardHeader,
  CardHeaderProps,
  CardMedia,
  CardMediaProps
} from "@mui/material";
import { ComponentProps } from "react";

export type BlogSummaryProps = ComponentProps<'div'> & {
  media: CardMediaProps;
  slug: string;
  subheader: CardHeaderProps['subheader'];
  title: CardHeaderProps['title'];
};

export const BlogSummary = ({
  media,
  slug,
  subheader,
  title,
  ...props
}: BlogSummaryProps) => {
  // TODO: Implement slug.
  return (
    <Card {...props}>
      <CardHeader
        title={title}
        subheader={subheader}
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
        {...media}
      />
    </Card>
  );
};

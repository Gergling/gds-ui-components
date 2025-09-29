import {
  Card,
  CardActionArea,
  CardHeader,
  CardHeaderProps,
  CardMedia,
  CardMediaProps,
  CardProps,
} from "@mui/material";

export type BlogSummaryProps = {
  media: CardMediaProps;
  onClick: (event: React.MouseEvent) => void;
  subheader: CardHeaderProps['subheader'];
  title: CardHeaderProps['title'];
  containerProps?: CardProps;
};

export const BlogSummary = ({
  media,
  onClick,
  subheader,
  title,
  ...props
}: BlogSummaryProps) => {
  return (
    <Card {...props.containerProps}>
      <CardActionArea onClick={onClick}>
        <CardHeader
          title={title}
          subheader={subheader}
        />
        <CardMedia
          component="img"
          height="194"
          alt={title}
          {...media}
        />
      </CardActionArea>
    </Card>
  );
};

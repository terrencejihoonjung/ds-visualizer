type BadgeProps = {
  text: string;
};

function Badge({ text }: BadgeProps) {
  return <span className="badge badge-md badge-primary">{text}</span>;
}

export default Badge;

type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      <img src={picture} className="w-12 h-12 rounded-full mr-4 border-3 border-black shadow-neo-sm" alt={name} />
      <div className="text-xl font-extrabold">{name}</div>
    </div>
  );
};

export default Avatar;

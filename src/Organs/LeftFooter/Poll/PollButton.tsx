interface PollButtonsProps {
  title: string;
  percentage: number;
  hasPolled: boolean;
  onClick: () => void;
}

function PollButton(props: PollButtonsProps) {
  return (
    <button
      disabled={props.hasPolled}
      className={`relative mb-2 flex h-10 items-center rounded-sm border border-dashed border-prim-500 bg-transparent p-0 text-prim-600 ${
        props.hasPolled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={props.onClick}
    >
      <div
        className={`m-0 h-full bg-prim-100 text-prim-900`}
        style={{
          width: `${props.percentage}%`
        }}
      />
      <p className="absolute left-3 z-10 text-sm font-bold">
        {props.title}
        {` (${props.percentage}%) `}
      </p>
    </button>
  );
}

export default PollButton;

export default function ChatSegment(props) {
  const isEven = props.sender === 'bot';
  const trianglePositionClasses = isEven ? 'left-0 top-[40%] -ml-[7px] -rotate-45 border-t border-l' : 'right-0 top-[40%] -mr-[7px] rotate-45 border-t border-r';

  return (
    <div className={`flex ${isEven ? 'justify-start' : 'justify-end'}`}>
      <div className={`relative max-w-[864px] w-fit p-3 rounded-lg border border-solid border-[#1D80A7] my-2 bg-white`}>
        <p className="text-base text-black font-normal">{props.chatMessage}</p>
        <div className={`absolute w-3 h-3 bg-white ${trianglePositionClasses} border-[#1D80A7]`}></div>
      </div>
    </div>
  )
}

interface INotification {
    isActive?:boolean
}
const Notification = (props:INotification) => {
    const{isActive = false} = props
    return (
        <span className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isActive ? 'bg-green-400' : 'bg-pink-400 '} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isActive ? 'bg-green-500' : 'bg-pink-500 '}`}></span>
        </span>)
}

export default Notification
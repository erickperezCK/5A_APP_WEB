import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';

export const Footer = () => {
    return (
        <footer className="bg-blue-950 text-white text-center p-4 h-35
            flex flex-row items-center justify-between">
            <div className="flex-1 text-left">
                <div className="">
                    <MailOutlineIcon />
                    <p className='inline pl-3' >Correo: luxueyMotor@gmail.com</p>
                </div>
                <div className="">
                    <PhoneIcon />
                    <p className='inline pl-3'>Teléfono: 777 598 8744</p>
                </div>
            </div>
            <div className="flex-1 text-2xl">Luxury Motors</div>
            <div className="flex-1 text-left">
                <div className="">
                    <LocationOnIcon />
                    <p className='inline pl-3'>Dirección: Emiliano Zapata</p>
                </div>
                <div className="">
                    <MarkAsUnreadIcon />
                    <p className='inline pl-3'>C.P. 62760</p>
                </div>
            </div>
            <div className="">
                <img src="/src/assets/logo/logo7.png" alt=""
                    className="h-20" />
            </div>
        </footer>
    )
}
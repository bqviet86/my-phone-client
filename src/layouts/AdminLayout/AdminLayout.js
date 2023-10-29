import Sidebar from '~/components/Admin/Sidebar'

function AdminLayout({ children }) {
    return (
        <div className='flex h-screen bg-gray-50 dark:bg-gray-900 font-sans'>
            <Sidebar />
            <div className='flex flex-col flex-1 w-full'>{children}</div>
        </div>
    )
}

export default AdminLayout

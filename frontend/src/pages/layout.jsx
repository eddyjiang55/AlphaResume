import NavBar from '../components/navbar';

export default function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>
  );
}
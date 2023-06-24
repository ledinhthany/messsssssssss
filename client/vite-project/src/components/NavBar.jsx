import { useContext } from "react";
import { Container, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const NavBar = () => {
    const { user, logoutUser } = useContext(AuthContext);

    return (
        <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
            <Container>
                <h2>
                    <Link to="/" className="link-light text-decoration-none">
                        Chưa Biết Để Gì
                    </Link>
                </h2>
                {user ? (
                    <span className="text-warning d-flex align-items-center">
                    <p className="font-weight-bold mb-0">Người Dùng</p>
                    <p className="ml-2 mb-0" style={{ marginLeft: '4px',fontSize: 'larger' }}>{user?.name}</p>
                  </span>
                  
                  
                ) : null}
                <nav>
                    <Stack direction="horizontal" gap={3}>
                        {!user ? (
                            <Link
                                to="/login"
                                className="link-light text-decoration-none"
                            >
                                Login
                            </Link>
                        ) : null}
                        {!user ? (
                            <Link
                                to="/register"
                                className="link-light text-decoration-none"
                            >
                                Register
                            </Link>
                        ) : null}
                        {user ? (
                            <button
                                className="link-light text-decoration-none"
                                onClick={logoutUser}
                            >
                                Logout
                            </button>
                        ) : null}
                    </Stack>
                </nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;

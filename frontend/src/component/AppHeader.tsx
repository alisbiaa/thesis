import { Layout, Typography } from 'antd';
const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
    const version = '1.0.0'; // Replace with your application version
    const env = process.env.NODE_ENV;
    return (
        <Header style={{ background: '#24e1f3', padding: '16px' }}>
            <Title level={4} style={{ marginBottom: '0' }}>
                Application Version: {version} | env: {env}
            </Title>
        </Header>
    );
};

export default AppHeader;

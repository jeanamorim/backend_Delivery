import 'dotenv/config';
import app from './app';

const port = process.env.PORT || 3005;
app.listen(port);

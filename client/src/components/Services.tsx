import { CartItem } from '../redux/slices/cartSlice';

interface IReq {
  price?: number;
  name: string;
  email: string;
  delivery?: string;
  address?: string;
  tel?: string;
  comment?: string;
  items?: CartItem[];
}

class Services {
  _baseOffset = 0;

  getResource = async (url: string) => {
    let res = await fetch(url, {});

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllItems = async (id: number | string | undefined) => {
    const res = await this.getResource(`http://localhost:5000/api/full/${id}`);
    return res;
  };
  getGroupItems = async (id: number | string | undefined, offset = this._baseOffset) => {
    const res = await this.getResource(`http://localhost:5000/api/group/${id}/${offset}`);
    return res;
  };
  getItem = async (id: number | string | undefined) => {
    const res = await this.getResource(`http://localhost:5000/api/item/${id}`);
    return res;
  };
  getSearch = async (q: string) => {
    const res = await this.getResource(`http://localhost:5000/api/search/${q}`);
    return res;
  };

  sendMessage = async (req: IReq, target: number) => {
    const options = {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(req),
    };
    const res = await fetch(`http://localhost:5000/api/submit/${target}`, options);

    if (!res.ok) {
      throw new Error(`Could not fetch, status: ${res.status}`);
    }
  };
}

export default Services;

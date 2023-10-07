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
  promocode?: string;
}
interface IProm {
  id: number;
  promocode: string;
  stock: string;
  value: string;
}

const API_BASE_URL = 'https://sunrise.na4u.ru/api';

class Services {
  private _baseOffset = 0;

  private async getResource<T>(url: string): Promise<T> {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return res.json();
  }

  private async postResource<T>(url: string, req: T): Promise<void> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Could not fetch, status: ${res.status}`);
    }
  }

  public async getCategories(): Promise<any> {
    return this.getResource(`${API_BASE_URL}/categories`);
  }

  public async getData(
    table?: string,
    page?: number,
    slider?: boolean,
    id?: string,
    search?: string,
    searchPanel?: boolean,
    filter?: string,
    sorting?: string,
  ): Promise<any> {
    let url = `${API_BASE_URL}/data?`;
    if (table) {
      url += `table=${table}&`;
    }
    if (page !== undefined) {
      url += `page=${page}&`;
    }
    if (slider !== undefined) {
      url += `slider=${slider}&`;
    }
    if (id) {
      url += `id=${id}&`;
    }
    if (search) {
      url += `search=${search}&`;
    }
    if (searchPanel !== undefined) {
      url += `searchPanel=${searchPanel}&`;
    }
    if (filter) {
      url += `filter=${filter}&`;
    }
    if (sorting) {
      url += `sorting=${sorting}&`;
    }

    return this.getResource(url);
  }

  public async getSorts(str: string): Promise<any> {
    return this.getResource(`${API_BASE_URL}/sorts?table=${str}`);
  }

  public async getPromocode(id: string): Promise<any> {
    return this.getResource(`${API_BASE_URL}/promocodes/${id}`);
  }

  public async postPromocode(req: IProm): Promise<void> {
    await this.postResource(`${API_BASE_URL}/prom`, req);
  }

  public async sendMessage(req: IReq, target: number): Promise<void> {
    await this.postResource(`${API_BASE_URL}/submit/${target}`, req);
  }
}

export default Services;

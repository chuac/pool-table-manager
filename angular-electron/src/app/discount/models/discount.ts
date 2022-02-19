import { DiscountType } from './discount-type.enum';
import { DiscountVoucherType } from './discount-voucher-type.enum';

export interface Discount {
	type: DiscountType;
	lifeMember?: boolean; // this could live on the Customer?
	percentage?: number;
	dollar?: number;
	voucher?: DiscountVoucherType;
}

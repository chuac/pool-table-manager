import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash-es';
import { MathHelper } from '../shared/helpers/math.helper';
import { Customer } from '../shared/models/customer.model';
import { Discount } from './models/discount';
import { DiscountType } from './models/discount-type.enum';
import { DiscountVoucherType } from './models/discount-voucher-type.enum';

@Injectable({
	providedIn: 'root'
})
export class DiscountService {

	constructor(
	) { }

	calcDiscount(runningCost: number, customer: Customer): number {
		if (isEmpty(customer)) {
			return 0;
		}

		switch (customer.discount?.type) {
			case DiscountType.voucher:
				return this.calcVoucherDiscount(runningCost, customer);
			case DiscountType.percentage:
				return this.calcPercentageDiscount(runningCost, customer.discount);
			case DiscountType.dollar:
				return customer.discount.dollar ?? 0;
			default:
				return 0;
		}
	}

	private calcVoucherDiscount(runningCost: number, customer: Customer): number {
		const discount = customer.discount;

		if (!discount?.voucher) {
			return 0;
		}

		switch (discount.voucher) {
			case DiscountVoucherType.tenPercentOff:
				return this.calcPercentageDiscount(runningCost, { type: DiscountType.percentage, percentage: 10 });
			case DiscountVoucherType.twentyFivePercentOff:
				return this.calcPercentageDiscount(runningCost, { type: DiscountType.percentage, percentage: 25 });
			case DiscountVoucherType.fiftyPercentOff:
				return this.calcPercentageDiscount(runningCost, { type: DiscountType.percentage, percentage: 50 });
			case DiscountVoucherType.halfHourFree:
			case DiscountVoucherType.oneHourFree:
			case DiscountVoucherType.payOneHourGetOneHourFree:
				return this.calcTimeDiscount(runningCost, customer);
			default:
				return 0;
		}

		const discountAmount = runningCost * (discount.percentage / 100);

		return MathHelper.roundDownToNearestTenCents(discountAmount);
	}

	private calcPercentageDiscount(runningCost: number, discount: Discount): number {
		if (!discount?.percentage) {
			return 0;
		}

		const discountAmount = runningCost * (discount.percentage / 100);

		return MathHelper.roundDownToNearestTenCents(discountAmount);
	}

	private calcTimeDiscount(runningCost: number, customer: Customer): number {
		// if (!discount.voucher) {
		// 	return 0;
		// }

		// const discountAmount = runningCost * (discount.percentage / 100);

		return MathHelper.roundDownToNearestTenCents(0); // TODO When price schemes are ready
	}
}

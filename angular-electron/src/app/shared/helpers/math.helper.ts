export class MathHelper {
	static roundDownToNearestTenCents(num: number): number {
		return Math.ceil(num * 10) / 10;
	}
}

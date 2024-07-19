export type Bip21Options = {
    amount?: number;
    label?: string;
    message?: string;
}
export function decode(uri: string, urnScheme?: string): {
    address: string;
    options: Bip21Options
};
export function encode(address: string, options?: Bip21Options, urnScheme?: string): string;

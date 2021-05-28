import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
export enum Icons {
  Bombe = 'bombe',
  'Secure-shield' = 'secure-shield',
  Shield = 'shield',
  Unchecked = 'unchecked',
  Bitcoin = 'bitcoin',
  BitcoinBalance = 'bitcoin-balance',
  Calendar = 'calendar',
  UserHashes = 'cryptography',
  currentBalance = 'bitcoin-currentbalance',
  BitcoinAddresses = 'bitcoin-addresses',
  BlockHash = 'block-hash',
  Check = 'checked-done',
  WinTrophy = 'trophy-win',
  BombActive = 'bomb-active',
  BombGames = 'bomb-games',
  WithDrawBitcoin = 'bitcoin-withdraw-symbol',
  GameLose = 'lose-game'
}
@Injectable({
  providedIn: 'root'
})
export class IconsService {

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) { }


    public registerIcons(): void {
      console.log(Object.values(Icons));
      this.loadIcons(Object.values(Icons), '../assets/svg/icons');
    }

    private loadIcons(iconKeys: string[], iconUrl: string): void {
      iconKeys.forEach(key => {
        this.matIconRegistry.addSvgIcon(key, this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`));
      });
    }


}



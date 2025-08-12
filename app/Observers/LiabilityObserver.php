<?php

namespace App\Observers;

use App\Models\Liability;

class LiabilityObserver
{
    //
    public function deleting(Liability $liability)
    {
        $netWorth = $liability->netWorth;
        $totalLiability = $liability->netWorthLiabilities->sum('nominal');

        $newNetWorth = $netWorth->current_net_worth + $totalLiability;

        $netWorth->update([
            'current_net_worth' => $newNetWorth,
            'amount_left' => $netWorth->net_worth_goal - $newNetWorth,
        ]);

        $liability->netWorthLiabilities()->delete();
    }
}

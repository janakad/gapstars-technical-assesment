<?php


namespace App\Repositories;


use App\Models\Customer;

/**
 * Class CustomerRepository
 * @package App\Repositories
 */
class CustomerRepository
{
    /**
     * @param array $data
     * @return Customer
     */
    public function insert(array $data = []): Customer
    {
        $customer = new Customer($data);
        $customer->save();
        return $customer;
    }

    /**
     * @param array $query
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function selectAll(array $query = [])
    {
        $customer = Customer::query();
        foreach ($query as $item => $value) {
            $customer->where($item, 'like', '%' . $value . '%');
        }
        return $customer->paginate();
    }
}
